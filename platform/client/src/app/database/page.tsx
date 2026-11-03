"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  UtensilsCrossed,
  ShoppingBag,
  Store,
  Layers,
  Search,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DatabaseViewerPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "users" | "menu" | "restaurants" | "categories">("orders");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/db/overview");
      const json = await res.json();
      if (json.status === "success") {
        setData(json.data);
      } else {
        setError(json.message || "Failed to load database overview");
      }
    } catch (e: any) {
      setError(e.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading MongoDB Atlas Live Data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4">
        <Card className="max-w-md p-6 bg-[#161b22] border-red-500/30 text-center space-y-4">
          <p className="text-red-400 font-semibold">{error || "No data available"}</p>
          <Button onClick={fetchData} className="bg-emerald-600 hover:bg-emerald-700">
            Retry Connection
          </Button>
        </Card>
      </div>
    );
  }

  const { stats, collections } = data;

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300">
                <ArrowLeft size={18} />
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                <span className="text-emerald-400">🍃 MongoDB Atlas</span> Live Database Explorer
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1 pl-11">
              Connected directly to Cluster0 (fastfood-buddy). Live database contents loaded in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-gray-200 gap-1.5"
            >
              <RefreshCw size={14} /> Refresh Data
            </Button>
            <Link href="/">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                Back to Food Store
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === "orders"
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-[#121820] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold">Orders</span>
              <ShoppingBag size={18} />
            </div>
            <p className="text-2xl font-black text-white">{stats.totalOrders}</p>
            <span className="text-[11px] text-gray-400">Live Customer Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === "users"
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-[#121820] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold">Users</span>
              <Users size={18} />
            </div>
            <p className="text-2xl font-black text-white">{stats.totalUsers}</p>
            <span className="text-[11px] text-gray-400">Registered Accounts</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === "menu"
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-[#121820] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between text-orange-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold">Menu Dishes</span>
              <UtensilsCrossed size={18} />
            </div>
            <p className="text-2xl font-black text-white">{stats.totalMenuItems}</p>
            <span className="text-[11px] text-gray-400">Pizzas, Burgers, Sodas</span>
          </button>

          <button
            onClick={() => setActiveTab("restaurants")}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === "restaurants"
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-[#121820] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold">Restaurants</span>
              <Store size={18} />
            </div>
            <p className="text-2xl font-black text-white">{stats.totalRestaurants}</p>
            <span className="text-[11px] text-gray-400">Partner Outlets</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === "categories"
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-[#121820] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold">Categories</span>
              <Layers size={18} />
            </div>
            <p className="text-2xl font-black text-white">{stats.totalCategories}</p>
            <span className="text-[11px] text-gray-400">Chinese, Indian, etc.</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={16} />
          <Input
            placeholder={`Search within ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-[#121820] border-gray-800 text-white focus:border-emerald-500"
          />
        </div>

        {/* Content Tabs */}

        {/* 1. ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="text-emerald-400" size={20} />
              Live Orders in Database ({collections.orders.length})
            </h2>
            <div className="grid gap-4">
              {collections.orders
                .filter((o: any) =>
                  !search ||
                  o._id.toLowerCase().includes(search.toLowerCase()) ||
                  o.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
                  o.deliveryAddress?.city?.toLowerCase().includes(search.toLowerCase())
                )
                .map((order: any) => (
                  <Card key={order._id} className="p-5 bg-[#121820] border-gray-800 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-800">
                      <div>
                        <span className="text-xs text-gray-400">Order ID:</span>
                        <p className="font-mono text-sm font-bold text-emerald-400">{order._id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs uppercase font-bold">
                          {order.status}
                        </Badge>
                        <Badge className="bg-blue-950 text-blue-400 border border-blue-800 text-xs uppercase font-bold">
                          {order.paymentMethod} ({order.paymentStatus})
                        </Badge>
                      </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="space-y-1.5">
                      <span className="text-xs text-gray-400 font-semibold">Ordered Dishes:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {order.items.map((it: any, idx: number) => (
                          <div key={idx} className="p-2 bg-[#1a222d] rounded-lg text-xs flex justify-between items-center">
                            <span className="text-gray-200 font-medium truncate">{it.name}</span>
                            <span className="text-emerald-400 font-bold ml-2">x{it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800/60 gap-2">
                      <div>
                        <span className="text-gray-500">Delivery Address: </span>
                        <span className="text-gray-300">
                          {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.zipCode}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500">Total: </span>
                        <span className="text-lg font-black text-white">₹{(order.total / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* 2. USERS TAB */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="text-blue-400" size={20} />
              Registered User Accounts ({collections.users.length})
            </h2>
            <div className="grid gap-3">
              {collections.users
                .filter((u: any) =>
                  !search ||
                  u.name.toLowerCase().includes(search.toLowerCase()) ||
                  u.email.toLowerCase().includes(search.toLowerCase()) ||
                  u.role.toLowerCase().includes(search.toLowerCase())
                )
                .map((user: any) => (
                  <Card key={user._id} className="p-4 bg-[#121820] border-gray-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={user.role === "admin" ? "bg-amber-950 text-amber-400 border border-amber-800 font-bold" : "bg-gray-800 text-gray-300"}>
                        {user.role}
                      </Badge>
                      <p className="text-[10px] text-gray-500 mt-1">ID: {user._id.slice(-6)}</p>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* 3. MENU DISHES TAB */}
        {activeTab === "menu" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UtensilsCrossed className="text-orange-400" size={20} />
              Menu Dishes in Database ({collections.menuItems.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collections.menuItems
                .filter((m: any) =>
                  !search ||
                  m.name.toLowerCase().includes(search.toLowerCase()) ||
                  m.category?.name?.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 60)
                .map((item: any) => (
                  <Card key={item._id} className="p-3 bg-[#121820] border-gray-800 rounded-xl flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 relative shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.category?.name || "General"}</p>
                      <p className="text-sm font-bold text-emerald-400 mt-1">₹{(item.price / 100).toFixed(2)}</p>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* 4. RESTAURANTS TAB */}
        {activeTab === "restaurants" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Store className="text-purple-400" size={20} />
              Partner Restaurants ({collections.restaurants.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collections.restaurants.map((rest: any) => (
                <Card key={rest._id} className="p-4 bg-[#121820] border-gray-800 rounded-xl space-y-2">
                  <p className="font-bold text-white text-sm">{rest.name}</p>
                  <p className="text-xs text-gray-400">{rest.address?.street}, {rest.address?.city}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-800">
                    <span className="text-amber-400 font-bold">★ {rest.rating}</span>
                    <span className="text-gray-400">{rest.deliveryTimeMinutes} mins delivery</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 5. CATEGORIES TAB */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="text-amber-400" size={20} />
              Food Categories ({collections.categories.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {collections.categories.map((cat: any) => (
                <Card key={cat._id} className="p-3 bg-[#121820] border-gray-800 rounded-xl text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {cat.name.charAt(0)}
                  </div>
                  <p className="font-bold text-xs text-white truncate">{cat.name}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

