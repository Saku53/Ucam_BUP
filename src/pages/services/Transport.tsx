import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Bus, MapPin, Clock, Users, Search, Navigation, X, Shield, Edit3, CheckCircle, Phone, Ticket, ChevronLeft, Wifi, WifiOff } from 'lucide-react';

interface BusRoute {
    id: string;
    routeName: string;
    routeNumber: string;
    departureTime: string;
    driver: string;
    driverPhone: string;
    status: 'At BUP' | 'On Route' | 'Traffic Delay' | 'Completed';
    currentLocation: string;
    capacity: number;
    availableSeats: number;
    fare: number;
    lat: number;
    lng: number;
    destLat: number;
    destLng: number;
}

// BUP is at Mirpur Cantonment, Dhaka
const BUP_LAT = 23.8223;
const BUP_LNG = 90.3654;

const INITIAL_ROUTES: BusRoute[] = [
    { id: '1', routeName: 'BUP → Uttara', routeNumber: '0472', departureTime: '02:00 PM', driver: 'Mahmud Hasan', driverPhone: '01711000001', status: 'At BUP', currentLocation: 'BUP Main Gate', capacity: 50, availableSeats: 45, fare: 40, lat: BUP_LAT, lng: BUP_LNG, destLat: 23.8759, destLng: 90.3795 },
    { id: '2', routeName: 'BUP → Kakrail', routeNumber: '0494', departureTime: '02:15 PM', driver: 'Ashraf Ali', driverPhone: '01711000002', status: 'On Route', currentLocation: 'Kuril Bishwa Road', capacity: 50, availableSeats: 12, fare: 60, lat: 23.8340, lng: 90.4196, destLat: 23.7368, destLng: 90.3978 },
    { id: '3', routeName: 'BUP → Maghbazar', routeNumber: '0501', departureTime: '01:30 PM', driver: 'Abdul Salam', driverPhone: '01711000003', status: 'Traffic Delay', currentLocation: 'Banani', capacity: 50, availableSeats: 0, fare: 60, lat: 23.7936, lng: 90.4048, destLat: 23.7462, destLng: 90.4057 },
    { id: '4', routeName: 'BUP → Shahbagh', routeNumber: '0512', departureTime: '02:00 PM', driver: 'Abdul Karim', driverPhone: '01711000004', status: 'At BUP', currentLocation: 'BUP Parking', capacity: 50, availableSeats: 50, fare: 50, lat: BUP_LAT, lng: BUP_LNG, destLat: 23.7388, destLng: 90.3953 },
    { id: '5', routeName: 'BUP → Khamar Bari', routeNumber: '0522', departureTime: '03:00 PM', driver: 'Rafiqul Islam', driverPhone: '01711000005', status: 'At BUP', currentLocation: 'BUP Parking', capacity: 50, availableSeats: 50, fare: 45, lat: BUP_LAT, lng: BUP_LNG, destLat: 23.7511, destLng: 90.3892 },
    { id: '6', routeName: 'BUP → Asad Gate', routeNumber: '0533', departureTime: '01:00 PM', driver: 'Jalal Uddin', driverPhone: '01711000006', status: 'Completed', currentLocation: 'Asad Gate', capacity: 50, availableSeats: 50, fare: 45, lat: 23.7572, destLng: 90.3644, destLat: 23.7572, lng: 90.3644 },
    { id: '7', routeName: 'BUP → City College', routeNumber: '0544', departureTime: '02:30 PM', driver: 'Kamal Hossain', driverPhone: '01711000007', status: 'At BUP', currentLocation: 'BUP Parking', capacity: 50, availableSeats: 40, fare: 55, lat: BUP_LAT, lng: BUP_LNG, destLat: 23.7270, destLng: 90.3895 },
    { id: '8', routeName: 'BUP → Jahangir Gate', routeNumber: '0555', departureTime: '01:45 PM', driver: 'Jamal Mia', driverPhone: '01711000008', status: 'On Route', currentLocation: 'Mohakhali', capacity: 50, availableSeats: 5, fare: 30, lat: 23.7756, lng: 90.4016, destLat: 23.7237, destLng: 90.3858 },
];

const STATUS_CONFIG = {
    'At BUP':       { color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500',   label: 'At BUP' },
    'On Route':     { color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500 animate-pulse', label: 'On Route' },
    'Traffic Delay':{ color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500 animate-pulse', label: 'Delayed' },
    'Completed':    { color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400',   label: 'Completed' },
};

declare global {
    interface Window {
        google: any;
        initBUPMap: () => void;
    }
}

export default function Transport() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [routes, setRoutes] = useState<BusRoute[]>(INITIAL_ROUTES);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<BusRoute>>({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [liveTracking, setLiveTracking] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const busMarkerRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);
    const directionsRendererRef = useRef<any>(null);
    const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Load Google Maps
    useEffect(() => {
        if (window.google?.maps) { setMapLoaded(true); return; }

        window.initBUPMap = () => setMapLoaded(true);

        const script = document.createElement('script');
        // Using OpenStreetMap via iframe fallback since Maps API key needed
        // We'll detect and gracefully degrade
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD-PLACEHOLDER&callback=initBUPMap&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onerror = () => setMapError(true);
        document.head.appendChild(script);

        // If no API key works, fallback after 3s
        setTimeout(() => {
            if (!window.google?.maps) setMapError(true);
        }, 3000);

        return () => {
            window.initBUPMap = () => {};
        };
    }, []);

    // Init map when route selected and maps loaded
    useEffect(() => {
        if (!selectedRoute || !mapLoaded || !mapRef.current || mapError) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: selectedRoute.lat, lng: selectedRoute.lng },
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
            ],
        });
        mapInstanceRef.current = map;

        // BUP origin marker
        new window.google.maps.Marker({
            position: { lat: BUP_LAT, lng: BUP_LNG },
            map,
            icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#1B2B4B', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
            title: 'BUP Main Campus',
        });

        // Bus marker
        const busMarker = new window.google.maps.Marker({
            position: { lat: selectedRoute.lat, lng: selectedRoute.lng },
            map,
            icon: { path: 'M17 20H7V7l5-5 5 5v13zm-5-2a1 1 0 100-2 1 1 0 000 2z', scale: 1.5, fillColor: '#0F7B6C', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 1, anchor: new window.google.maps.Point(12, 12) },
            title: `Bus ${selectedRoute.routeNumber}`,
        });
        busMarkerRef.current = busMarker;

        // Info window
        const infoWindow = new window.google.maps.InfoWindow({
            content: `<div style="padding:8px;font-family:sans-serif"><b>Bus ${selectedRoute.routeNumber}</b><br/>${selectedRoute.routeName}<br/><span style="color:#0F7B6C">${selectedRoute.status}</span><br/>📍 ${selectedRoute.currentLocation}</div>`,
        });
        busMarker.addListener('click', () => infoWindow.open(map, busMarker));

        // Draw route
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map, suppressMarkers: true,
            polylineOptions: { strokeColor: '#0F7B6C', strokeWeight: 4, strokeOpacity: 0.7 },
        });
        directionsRendererRef.current = directionsRenderer;

        directionsService.route({
            origin: { lat: BUP_LAT, lng: BUP_LNG },
            destination: { lat: selectedRoute.destLat, lng: selectedRoute.destLng },
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result: any, status: any) => {
            if (status === 'OK') directionsRenderer.setDirections(result);
        });

    }, [selectedRoute, mapLoaded, mapError]);

    // Live tracking simulation
    const startTracking = useCallback(() => {
        if (!selectedRoute || !mapLoaded || mapError) return;
        setLiveTracking(true);

        let step = 0;
        trackingIntervalRef.current = setInterval(() => {
            step += 1;
            // Simulate bus moving slightly toward destination
            setRoutes(prev => prev.map(r => {
                if (r.id !== selectedRoute.id) return r;
                const newLat = r.lat + (r.destLat - BUP_LAT) * 0.01;
                const newLng = r.lng + (r.destLng - BUP_LNG) * 0.01;
                if (busMarkerRef.current) {
                    busMarkerRef.current.setPosition({ lat: newLat, lng: newLng });
                    mapInstanceRef.current?.panTo({ lat: newLat, lng: newLng });
                }
                return { ...r, lat: newLat, lng: newLng };
            }));
        }, 3000);
    }, [selectedRoute, mapLoaded, mapError]);

    const stopTracking = useCallback(() => {
        setLiveTracking(false);
        if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    }, []);

    useEffect(() => () => { if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current); }, []);

    // Get user location and show on map
    const locateUser = useCallback(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLocation(loc);
            if (mapInstanceRef.current && window.google?.maps) {
                if (userMarkerRef.current) userMarkerRef.current.setMap(null);
                userMarkerRef.current = new window.google.maps.Marker({
                    position: loc, map: mapInstanceRef.current,
                    icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#3B82F6', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
                    title: 'Your Location',
                });
                mapInstanceRef.current.panTo(loc);
            }
        });
    }, []);

    // Open Google Maps directions in new tab
    const openDirections = useCallback(() => {
        if (!selectedRoute) return;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${BUP_LAT},${BUP_LNG}&destination=${selectedRoute.destLat},${selectedRoute.destLng}&travelmode=driving`;
        window.open(url, '_blank');
    }, [selectedRoute]);

    const showMessage = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleAdminUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRoute) {
            const updated = { ...selectedRoute, ...editForm } as BusRoute;
            setRoutes(prev => prev.map(r => r.id === selectedRoute.id ? updated : r));
            setSelectedRoute(updated);
            setIsEditing(false);
            showMessage('Route status updated successfully!');
        }
    };

    const filteredRoutes = useMemo(() =>
        routes.filter(r =>
            r.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.currentLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.routeNumber.includes(searchTerm)
        ), [routes, searchTerm]);

    const handleSelectRoute = (route: BusRoute) => {
        stopTracking();
        setSelectedRoute(route);
        setIsEditing(false);
    };

    const handleBack = () => {
        stopTracking();
        setSelectedRoute(null);
        setIsEditing(false);
        if (mapInstanceRef.current) mapInstanceRef.current = null;
    };

    const currentRouteData = selectedRoute ? routes.find(r => r.id === selectedRoute.id) || selectedRoute : null;

    return (
        <div className="max-w-6xl mx-auto space-y-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Transport & Bus Tracker</h1>
                    <p className="text-sm text-slate-500 mt-1">Live university bus tracking and schedules</p>
                </div>
                <button
                    onClick={() => setIsAdmin(!isAdmin)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-sm border ${isAdmin ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                    <Shield size={16} />
                    {isAdmin ? 'Admin Mode: ON' : 'Enable Admin Mode'}
                </button>
            </div>

            {successMsg && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{successMsg}</p>
                </div>
            )}

            {!currentRouteData ? (
                /* ── ROUTE GRID ── */
                <div className="space-y-5">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search routes, stops, or bus numbers..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/30 text-sm bg-white shadow-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredRoutes.map(route => {
                            const sc = STATUS_CONFIG[route.status];
                            const pct = Math.round(((route.capacity - route.availableSeats) / route.capacity) * 100);
                            return (
                                <div
                                    key={route.id}
                                    onClick={() => handleSelectRoute(route)}
                                    className="bg-white hover:shadow-md border border-slate-100 hover:border-emerald-200 p-5 rounded-2xl cursor-pointer transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold text-slate-400">#{route.routeNumber}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${sc.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                            {sc.label}
                    </span>
                                    </div>
                                    <h3 className="font-semibold text-slate-800 text-sm mb-3 group-hover:text-emerald-700 transition-colors">{route.routeName}</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><Clock size={11}/>{route.departureTime}</span>
                                            <span className="flex items-center gap-1"><Ticket size={11}/>৳{route.fare}</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                                <span>Occupancy</span>
                                                <span>{route.capacity - route.availableSeats}/{route.capacity}</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-red-400' : pct > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredRoutes.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            <Bus className="w-10 h-10 mx-auto mb-3 opacity-40" />
                            <p className="font-medium">No routes found</p>
                        </div>
                    )}
                </div>

            ) : (
                /* ── LIVE TRACKER VIEW ── */
                <div className="space-y-5">
                    <button onClick={handleBack} className="text-emerald-700 font-medium text-sm flex items-center gap-1 hover:underline">
                        <ChevronLeft size={16} /> Back to Routes
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                        {/* MAP */}
                        <div className="lg:col-span-2">
                            <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200" style={{ height: 480 }}>

                                {/* Real Google Map */}
                                {!mapError && (
                                    <div ref={mapRef} className="absolute inset-0 w-full h-full" />
                                )}

                                {/* Fallback: OpenStreetMap embed (no API key needed) */}
                                {mapError && (
                                    <iframe
                                        title="BUP Bus Map"
                                        className="absolute inset-0 w-full h-full border-0"
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentRouteData.lng - 0.08}%2C${currentRouteData.lat - 0.06}%2C${currentRouteData.lng + 0.08}%2C${currentRouteData.lat + 0.06}&layer=mapnik&marker=${currentRouteData.lat}%2C${currentRouteData.lng}`}
                                        loading="lazy"
                                    />
                                )}

                                {/* Map loading state */}
                                {!mapLoaded && !mapError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                                        <div className="text-center">
                                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                            <p className="text-sm text-slate-500">Loading map...</p>
                                        </div>
                                    </div>
                                )}

                                {/* Map Controls */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                                    <button
                                        onClick={openDirections}
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-medium text-xs flex items-center gap-2 hover:bg-emerald-700 transition"
                                    >
                                        <Navigation size={14} /> Open in Google Maps
                                    </button>
                                    <button
                                        onClick={locateUser}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg font-medium text-xs flex items-center gap-2 hover:bg-blue-700 transition"
                                    >
                                        <MapPin size={14} /> My Location
                                    </button>
                                    {mapLoaded && !mapError && (
                                        <button
                                            onClick={liveTracking ? stopTracking : startTracking}
                                            className={`px-4 py-2 rounded-full shadow-lg font-medium text-xs flex items-center gap-2 transition ${liveTracking ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            {liveTracking ? <><WifiOff size={14}/> Stop Tracking</> : <><Wifi size={14}/> Live Track</>}
                                        </button>
                                    )}
                                </div>

                                {/* Live badge */}
                                {liveTracking && (
                                    <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        LIVE
                                    </div>
                                )}

                                {/* Bottom status bar */}
                                <div className="absolute bottom-3 left-3 right-3 z-10">
                                    <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/10 text-white flex justify-between items-center">
                                        <div>
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Current Location</p>
                                            <p className="font-semibold text-sm flex items-center gap-1"><MapPin size={12} className="text-emerald-400" />{currentRouteData.currentLocation}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Status</p>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_CONFIG[currentRouteData.status].color}`}>
                        {currentRouteData.status}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SIDE PANEL */}
                        <div className="space-y-4">

                            {/* Info Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">{currentRouteData.routeName}</h2>
                                        <p className="text-xs text-slate-400">Route #{currentRouteData.routeNumber}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${STATUS_CONFIG[currentRouteData.status].color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[currentRouteData.status].dot}`} />
                                        {currentRouteData.status}
                  </span>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold">Departure</p>
                                            <p className="font-semibold text-slate-800">{currentRouteData.departureTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-slate-400 text-[10px] uppercase font-bold">Seats Available</p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-slate-800">{currentRouteData.availableSeats} / {currentRouteData.capacity}</p>
                                                {currentRouteData.availableSeats === 0 && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">FULL</span>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Ticket className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold">Fare</p>
                                            <p className="font-semibold text-slate-800">৳{currentRouteData.fare}</p>
                                        </div>
                                    </div>*/}
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold">Driver</p>
                                            <p className="font-semibold text-slate-800">{currentRouteData.driver}</p>
                                            <a href={`tel:${currentRouteData.driverPhone}`} className="text-xs text-emerald-600 hover:underline font-medium">{currentRouteData.driverPhone}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Panel */}
                            {isAdmin && (
                                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-5 text-white">
                                    <div className="flex items-center gap-2 mb-4 text-emerald-400">
                                        <Shield className="w-4 h-4" />
                                        <h3 className="font-bold text-sm">Admin Controls</h3>
                                    </div>

                                    {!isEditing ? (
                                        <button
                                            onClick={() => { setEditForm(currentRouteData); setIsEditing(true); }}
                                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 rounded-xl transition text-sm font-medium flex items-center justify-center gap-2"
                                        >
                                            <Edit3 className="w-4 h-4" /> Update Live Status
                                        </button>
                                    ) : (
                                        <form onSubmit={handleAdminUpdate} className="space-y-3">
                                            <div>
                                                <label className="text-xs text-slate-400 block mb-1">Status</label>
                                                <select
                                                    value={editForm.status}
                                                    onChange={e => setEditForm({ ...editForm, status: e.target.value as BusRoute['status'] })}
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                                >
                                                    <option value="At BUP">At BUP</option>
                                                    <option value="On Route">On Route</option>
                                                    <option value="Traffic Delay">Traffic Delay</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 block mb-1">Current Location</label>
                                                <input
                                                    type="text"
                                                    value={editForm.currentLocation}
                                                    onChange={e => setEditForm({ ...editForm, currentLocation: e.target.value })}
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 block mb-1">Available Seats</label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={currentRouteData.capacity}
                                                    value={editForm.availableSeats}
                                                    onChange={e => setEditForm({ ...editForm, availableSeats: Number(e.target.value) })}
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 block mb-1">Departure Time</label>
                                                <input
                                                    type="text"
                                                    value={editForm.departureTime}
                                                    onChange={e => setEditForm({ ...editForm, departureTime: e.target.value })}
                                                    placeholder="e.g. 02:30 PM"
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                            <div className="flex gap-2 pt-1">
                                                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2.5 rounded-lg text-sm font-semibold transition">Save</button>
                                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2.5 rounded-lg text-sm font-medium transition">Cancel</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}