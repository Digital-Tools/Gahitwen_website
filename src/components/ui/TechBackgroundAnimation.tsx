import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
    Server,
    CloudCog,
    Cpu,
    Database,
    Globe,
    Smartphone,
    Wifi,
    Cog,
    Recycle,
    Lightbulb,
    BarChart,
    Code
} from 'lucide-react';

const TechBackgroundAnimation = () => {
    // Create raw motion values (won't trigger React renders) :contentReference[oaicite:0]{index=0}
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth them with springs for natural movement :contentReference[oaicite:1]{index=1}
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update motion values directly—no React state, no re-render :contentReference[oaicite:2]{index=2}
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Your tech icons and layout (unchanged)…
    const techIcons = [
        { Icon: Server, title: 'Server' },
        { Icon: CloudCog, title: 'Cloud Solutions' },
        { Icon: Cpu, title: 'Processing' },
        { Icon: Database, title: 'Data Storage' },
        { Icon: Globe, title: 'Global Network' },
        { Icon: Smartphone, title: 'Mobile Tech' },
        { Icon: Wifi, title: 'Connectivity' },
        { Icon: Cog, title: 'System Integration' },
        { Icon: Recycle, title: 'Waste Management' },
        { Icon: Lightbulb, title: 'Smart Solutions' },
        { Icon: BarChart, title: 'Analytics' },
        { Icon: Code, title: 'Software Development' }
    ];

    const points = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 5 + (i % 4) * 30,
        y: 20 + Math.floor(i / 4) * 30,
        size: 5 + Math.random() * 4,
        delay: i * 0.2,
        iconIndex: i % techIcons.length
    }));

    const iconVariants = {
        animate: (i: number) => ({
            x: [0, 5, -5, 0],
            y: [0, -5, 5, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                x: { repeat: Infinity, duration: 4 + i * 0.5, ease: 'easeInOut' },
                y: { repeat: Infinity, duration: 5 + i * 0.5, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 6 + i * 0.5, ease: 'easeInOut' }
            }
        })
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent" />

            <div className="absolute inset-0 w-full h-full">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {points.map((p, i) =>
                        points.slice(i + 1).map(o => {
                            const dist = Math.hypot(p.x - o.x, p.y - o.y);
                            if (dist < 25) {
                                return (
                                    <motion.line
                                        key={`${p.id}-${o.id}`}
                                        x1={p.x} y1={p.y} x2={o.x} y2={o.y}
                                        stroke="rgba(120,83,47,0.15)" strokeWidth="0.2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.7, 0.5] }}
                                        transition={{
                                            duration: 3,
                                            delay: (p.id + o.id) * 0.1,
                                            repeat: Infinity,
                                            repeatType: 'reverse'
                                        }}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                    <motion.path
                        d="M30,30 Q40,20 50,30 T70,30"
                        fill="none" stroke="rgba(209,176,143,0.3)" strokeWidth="0.5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                    />
                    <motion.path
                        d="M20,60 Q40,70 60,60 T80,60"
                        fill="none" stroke="rgba(234,179,8,0.2)" strokeWidth="0.5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
                    />
                </svg>

                {points.map(point => {
                    const { Icon } = techIcons[point.iconIndex];
                    return (
                        <motion.div
                            key={point.id}
                            className="absolute"
                            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%,-50%)' }}
                            custom={point.id}
                            variants={iconVariants}
                            animate="animate"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ opacity: { duration: 1, delay: point.delay } }}
                        >
                            <Icon size={point.size * 4} color="rgba(120,83,47,0.4)" strokeWidth={1.5} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Mouse‐follow circle driven by springs (no flicker) */}
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-brown-100 opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ x: springX, y: springY }}
                transition={{ type: 'spring', damping: 30, stiffness: 100, restDelta: 0.001 }}
            />
        </div>
    );
};

export default TechBackgroundAnimation;
