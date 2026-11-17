import { moduleInfo } from "@/content/catalog";
import type { ModuleId } from "@/lib/types";
import { ActivityList } from "./activity-list";
import { ModuleIcon } from "./module-icon";
import { PageIntro } from "./ui";

export function ModulePage({ module }: { module: ModuleId }) {
  const info = moduleInfo(module);
  return (
    <>
      <PageIntro
        back={{ href: "/#modulos", label: "Todas las habilidades" }}
        eyebrow={
          <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-ice-300">
            <ModuleIcon module={module} className="size-5" />
          </span>
        }
        title={info.name}
      >
        {info.intro}
      </PageIntro>
      <ActivityList module={module} />
    </>
  );
}
