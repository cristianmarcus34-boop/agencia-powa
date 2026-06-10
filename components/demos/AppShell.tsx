// components/demos/AppShell.tsx
export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-[320px] mx-auto h-[600px] border-[8px] border-slate-900 rounded-[3rem] overflow-hidden bg-white shadow-2xl flex flex-col relative">
            {/* Notch simulado */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-20"></div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pt-8">
                {children}
            </div>

            {/* Indicador de barra home */}
            <div className="h-1 w-24 bg-slate-900 mx-auto mb-2 rounded-full"></div>
        </div>
    );
}