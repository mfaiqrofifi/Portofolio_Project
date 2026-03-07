"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Admin backend not implemented yet.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div
          className="p-8 border-2"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "4px 4px 0px var(--pixel-border)",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 flex items-center justify-center border-2"
              style={{
                borderColor: "var(--accent)",
                background: "var(--background)",
              }}
            >
              <Lock size={16} style={{ color: "var(--accent)" }} />
            </div>
            <p
              className="font-pixel text-xs"
              style={{ color: "var(--foreground)" }}
            >
              Admin Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                className="font-pixel text-[9px] block mb-2"
                style={{ color: "var(--muted)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 border-2 text-sm outline-none"
                style={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label
                className="font-pixel text-[9px] block mb-2"
                style={{ color: "var(--muted)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2.5 border-2 text-sm outline-none"
                style={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-pixel text-[8px]" style={{ color: "#f472b6" }}>
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              className="w-full font-pixel text-[10px] py-3 border-2 mt-2"
              style={{
                background: "var(--accent)",
                color: "var(--background)",
                borderColor: "var(--pixel-border)",
                boxShadow: "3px 3px 0px var(--pixel-border)",
              }}
              whileHover={{
                y: -1,
                boxShadow: "4px 4px 0px var(--pixel-border)",
              }}
              whileTap={{
                y: 1,
                x: 1,
                boxShadow: "1px 1px 0px var(--pixel-border)",
              }}
            >
              Login
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
