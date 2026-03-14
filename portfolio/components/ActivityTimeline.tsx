"use client";

import { ActivityWithLinks } from "@/lib/types";
import ActivityCard from "./ActivityCard";
import { motion } from "framer-motion";

interface ActivityTimelineProps {
  items: ActivityWithLinks[];
}

export default function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {items.map((activity, i) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          index={i}
          isLast={i === items.length - 1}
        />
      ))}
    </motion.div>
  );
}
