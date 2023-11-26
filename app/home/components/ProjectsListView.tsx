import { ProjectModel } from "@/app/model/ProjectModel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectListItem } from "./ProjectListItem";

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
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  );
};
