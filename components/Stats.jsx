// "use client";
// import { useEffect, useRef, useState } from "react";

// export default function Stats() {
//     const stats = [
//         { value: 250, suffix: "+", label: "Active Users" },
//         { value: 1200, suffix: "+", label: "Jobs Matched" },
//         { value: 95, suffix: "%", label: "Success Rate" },
//         { value: 50, suffix: "+", label: "Partner Companies" },
//     ];

//     const [visible, setVisible] = useState(false);
//     const ref = useRef(null);

//     // detect when section enters viewport
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => setVisible(entry.isIntersecting),
//             { threshold: 0.3 }
//         );
//         if (ref.current) observer.observe(ref.current);
//         return () => observer.disconnect();
//     }, []);

//     return (
//         <section ref={ref} className="py-20 bg-gray-50 text-center">
//             <div className="max-w-4xl mx-auto mb-12">
//                 <p className="font-bold text-2xl bg-gradient-to-r from-indigo-950 to-indigo-500 bg-clip-text text-transparent animate-text">
//                     Why Choose AutoPlaced
//                 </p>

//                 <h2 className="mt-2 text-3xl font-bold text-gray-600">
//                     Discover jobs faster with our <span className=" text-black">AI-powered automated </span> search platform.
//                 </h2>
//             </div>

//             <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//                 {stats.map((s, i) => (
//                     <StatCard key={i} value={s.value} suffix={s.suffix} label={s.label} visible={visible} />
//                 ))}
//             </div>
//         </section>
//     );
// }

// // 🔥 Stat Card with animated counter
// function StatCard({ value, suffix, label, visible }) {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         if (!visible) return;

//         let start = 0;
//         const duration = 1500; // 1.5s animation
//         const stepTime = 20;
//         const steps = duration / stepTime;
//         const increment = value / steps;

//         const timer = setInterval(() => {
//             start += increment;
//             if (start >= value) {
//                 start = value;
//                 clearInterval(timer);
//             }
//             setCount(Math.floor(start));
//         }, stepTime);

//         return () => clearInterval(timer);
//     }, [visible, value]);

//     return (
//         <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
//             <h3 className="text-4xl font-extrabold text-indigo-600">
//                 {count}
//                 {suffix}
//             </h3>
//             <p className="text-gray-600 mt-2">{label}</p>
//         </div>
//     );
// }


"use client";
import { useEffect, useRef, useState } from "react";

export default function Stats() {
    const stats = [
        { value: 68, suffix: "%", label: "Less Time Spent Searching", bg: "bg-[#081b3a]", textColor: "text-white" },
        { value: 80, suffix: "%", label: "Resume Improvement Success", bg: "bg-green-50", textColor: "text-gray-700" },
        { value: 3, suffix: "X", label: "Higher Interview Chances", bg: "bg-green-50", textColor: "text-gray-700" },
        { value: 92, suffix: "%", label: "Positive Feedback From Users", bg: "bg-[#081b3a]", textColor: "text-white" },
    ];

    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    // detect when section enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-20 bg-gray-50 text-center">
            <div className="max-w-4xl mx-auto mb-12">
                <p className="font-bold text-2xl bg-gradient-to-r from-indigo-950 to-indigo-500 bg-clip-text text-transparent animate-text">
                    Why Choose AutoPlaced
                </p>
                <h2 className="mt-2 text-4xl font-bold text-gray-600">
                    Discover jobs faster with our <span className="text-[#010a18]">AI-powered automated search</span>  platform.
                </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <StatCard
                        key={i}
                        value={s.value}
                        suffix={s.suffix}
                        label={s.label}
                        visible={visible}
                        bg={s.bg}
                        textColor={s.textColor}
                    />
                ))}
            </div>
        </section>
    );
}

// 🔥 Stat Card with animated counter
function StatCard({ value, suffix, label, visible, bg, textColor }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!visible) return;

        let start = 0;
        const duration = 1500; // 1.5s animation
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = value / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                start = value;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, stepTime);

        return () => clearInterval(timer);
    }, [visible, value]);

    return (
        <div
            className={`${bg} ${textColor} p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center transition hover:shadow-xl`}
        >
            <h3 className="text-5xl font-extrabold">
                {count}
                {suffix}
            </h3>
            <p className="mt-2 text-lg">{label}</p>
        </div>
    );
}
