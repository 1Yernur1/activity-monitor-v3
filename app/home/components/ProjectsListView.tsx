import { ProjectModel } from "@/app/model/ProjectModel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ProjectsListView = ({
  projectsList,
}: {
  projectsList: ProjectModel[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div>
      {projectsList.map((project) => (
        <div
          key={project.id}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("projectId", project.id.toString());
            router.replace(`${pathname}?${params}`);
          }}
        >
          {project.name}
        </div>
      ))}
    </div>
  );
};
