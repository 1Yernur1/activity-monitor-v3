"use client";
import { ProjectModel } from "@/app/model/ProjectModel";
import { MoreHorizOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { deleteExtraChiefEditor } from "../service/fetcher";
import { useSession } from "next-auth/react";

export const ProjectListItem = ({ project: { id, name, extraChiefEditors } }: { project: ProjectModel }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const session = useSession();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => setAnchorEl(null);
	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const handleSelectProject = () => {
		const params = new URLSearchParams(searchParams);
		params.set("projectId", id.toString());
		router.replace(`${pathname}?${params}`);
	};
	const handleClickEdit = () => {
		handleClose();
		const params = new URLSearchParams(searchParams);
		params.set("projectId", id.toString());
		params.set("editProject", "true");
		router.replace(`${pathname}?${params}`);
	};
	const handleClickAddChief = () => {
		handleClose();
		const params = new URLSearchParams(searchParams);
		params.set("projectId", id.toString());
		params.set("addExtraChief", "true");
		router.replace(`${pathname}?${params}`);
	};

	const handleClickDeleteChief = () => {
		handleClose();
		setIsLoading(true);
		if (session.data?.user && extraChiefEditors.length !== 0) {
			const { user } = session.data;
			const { idToken } = user;
			const params = new URLSearchParams(searchParams);
			params.set("projectId", id.toString());
			params.set("deleteExtraChief", "true");
			deleteExtraChiefEditor(id, extraChiefEditors[0].id, idToken)
				.then((data) => window.location.replace(`/?projectId=${data.id}`))
				.catch(() => alert("Something happen wrong, please try again later"))
				.finally(() => setIsLoading(false));
		}

		// router.replace(`${pathname}?${params}`);
	};
	const loading = isLoading && <Typography>Loading...</Typography>;
	const content = !isLoading && (
		<div className="flex justify-between items-center">
			<Typography sx={{ cursor: "pointer" }} onClick={handleSelectProject}>
				{name}
			</Typography>
			<IconButton onClick={handleOpenMenu}>
				<MoreHorizOutlined color="secondary" />
			</IconButton>
		</div>
	);
	return (
		<>
			{loading}
			{content}
			<Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
				<MenuItem onClick={handleClickEdit}>Edit</MenuItem>
				{extraChiefEditors.length === 0 ? (
					<MenuItem onClick={handleClickAddChief}>Add Extra Chief Editor</MenuItem>
				) : (
					<MenuItem onClick={handleClickDeleteChief}>Delete Extra Chief Editor</MenuItem>
				)}
			</Menu>
		</>
	);
};
