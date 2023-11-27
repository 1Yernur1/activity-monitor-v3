import { ProjectModel } from "@/app/model/ProjectModel";
import { Typography } from "@mui/material";

export const ProjectDisplay = ({
  project: {
    name,
    chiefEditor,
    manager,
    extraChiefEditors,
    createdAt,
    targetDate,
  },
}: {
  project: ProjectModel;
}) => {
  return (
    <div className="px-4 mb-2 pt-2">
      <Typography variant="body1" fontWeight={500}>
        {name}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        <span className="font-normal">Chief editor:</span>{" "}
        {`${chiefEditor.firstName} ${chiefEditor.lastName}`}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        <span className="font-normal">Project Manager:</span>{" "}
        {`${manager.firstName} ${manager.lastName}`}
      </Typography>
      {extraChiefEditors.length > 0 && (
        <Typography variant="body1" fontWeight={500}>
          <span className="font-normal">Extra Chief Editor:</span>{" "}
          {`${extraChiefEditors[0].firstName} ${extraChiefEditors[0].lastName}`}
        </Typography>
      )}
      <Typography variant="body1" fontWeight={500}>
        <span className="font-normal">Created Date:</span>{" "}
        {new Date(createdAt).toLocaleDateString("en-GB")}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        <span className="font-normal">Deadline:</span>{" "}
        {new Date(targetDate).toLocaleDateString("en-GB")}
      </Typography>
    </div>
  );
};
