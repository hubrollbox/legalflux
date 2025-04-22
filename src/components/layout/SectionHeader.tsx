
import React from "react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;[00:31:28.220] Cloning github.com/hubrollbox/legalflux (Branch: main, Commit: 2028779)
  [00:31:28.919] Cloning completed: 699.000ms
  [00:31:32.789] Restored build cache from previous deployment (FxT1JZg3f8eNtRAeBe2SejxqZNqF)
  [00:31:32.873] Running build in Washington, D.C., USA (East) – iad1
  [00:31:33.630] Running "vercel build"
  [00:31:34.022] Vercel CLI 41.6.0
  [00:31:34.639] Installing dependencies...
  [00:31:37.152] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
  [00:31:37.173] npm warn deprecated @supabase/auth-helpers-shared@0.1.4: This package is now deprecated - please use the @supabase/ssr package instead.
  [00:31:37.522] npm warn deprecated @supabase/auth-helpers-nextjs@0.2.9: This package is now deprecated - please use the @supabase/ssr package instead.
  [00:31:37.957] npm warn deprecated jose@1.28.2: this version is no longer supported
  [00:31:46.962] 
  [00:31:46.962] added 63 packages, removed 737 packages, and changed 39 packages in 12s
  [00:31:46.965] 
  [00:31:46.965] 46 packages are looking for funding
  [00:31:46.965]   run `npm fund` for details
  [00:31:47.010] Running "npm run build"
  [00:31:47.126] 
  [00:31:47.126] > legalflux@1.0.0 build
  [00:31:47.126] > set TS_NODE_PROJECT=tsconfig.json && next build
  [00:31:47.126] 
  [00:31:47.666] Attention: Next.js now collects completely anonymous telemetry regarding usage.
  [00:31:47.666] This information is used to shape Next.js' roadmap and prioritize features.
  [00:31:47.667] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
  [00:31:47.667] https://nextjs.org/telemetry
  [00:31:47.667] 
  [00:31:47.737]    Linting and checking validity of types ...
  [00:32:03.492] Failed to compile.
  [00:32:03.492] 
  [00:32:03.493] ./src/components/layout/Sidebar.tsx:4:1
  [00:32:03.493] Type error: 'LogOut' is declared but its value is never read.
  [00:32:03.493] 
  [00:32:03.493] [0m [90m 2 | [39m[36mimport[39m [33mReact[39m [36mfrom[39m [32m"react"[39m[33m;[39m[0m
  [00:32:03.493] [0m [90m 3 | [39m[36mimport[39m { useNavigate } [36mfrom[39m [32m"react-router-dom"[39m[33m;[39m[0m
  [00:32:03.493] [0m[31m[1m>[22m[39m[90m 4 | [39m[36mimport[39m { [33mLogOut[39m } [36mfrom[39m [32m"lucide-react"[39m[33m;[39m[0m
  [00:32:03.493] [0m [90m   | [39m[31m[1m^[22m[39m[0m
  [00:32:03.493] [0m [90m 5 | [39m[36mimport[39m [33mDesktopSidebar[39m [36mfrom[39m [32m"./sidebar/DesktopSidebar"[39m[33m;[39m[0m
  [00:32:03.493] [0m [90m 6 | [39m[36mimport[39m [33mMobileSidebar[39m [36mfrom[39m [32m"./sidebar/MobileSidebar"[39m[33m;[39m[0m
  [00:32:03.493] [0m [90m 7 | [39m[36mimport[39m { sidebarItems } [36mfrom[39m [32m"./sidebar/sidebarConfig"[39m[33m;[39m[0m
  [00:32:03.545] Error: Command "npm run build" exited with 1
  [00:32:03.923] 
  description?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
  children,
}) => {
  return (
    <div className={`flex justify-between items-center mb-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default SectionHeader;
