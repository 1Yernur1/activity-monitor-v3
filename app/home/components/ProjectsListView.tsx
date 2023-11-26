import { ProjectModel } from "@/app/model/ProjectModel";

export const ProjectsListView = ({
  projectsList,
}: {
  projectsList: ProjectModel[];
}) => {
  return (
    <div>
      {projectsList.map((project) => (
        <div>{project.name}</div>
      ))}
    </div>
  );
};
