"use client";
import {
	Autocomplete,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addExtraChiefEditor, getAllExtraChiefEditorsByProjectId, getProjectById } from "../service/fetcher";
import { ProfileModel } from "@/app/model/ProfileModel";

export const AddExtraChiefModal = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const session = useSession();
	const isOpen = searchParams.has("addExtraChief");
	const projectId = searchParams.get("projectId");
	const [isDisabled, setIsDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [extraChiefEditorsList, setExtraChiefEditorsList] = useState<ProfileModel[]>([]);
	const [extraChiefEditor, setExtraChiefEditor] = useState<ProfileModel>({} as ProfileModel);

	useEffect(() => {
		setIsLoading(true);
		if (session.data?.user && projectId) {
			const { user } = session.data;
			const { idToken } = user;

			Promise.all([
				getAllExtraChiefEditorsByProjectId(+projectId, idToken)
					.then((data) => setExtraChiefEditorsList(data))
					.catch(() => setIsError(true)),
				getProjectById(projectId, idToken)
					.then((data) => setExtraChiefEditor(data.extraChiefEditors[0]))
					.catch(() => setIsError(true)),
			]).finally(() => setIsLoading(false));
		}
	}, [session]);

	const handleClose = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("addExtraChief");
		router.replace(`${pathname}?${params}`);
	};

	const handleAddExtraChiefEditor = () => {
		setIsDisabled(true);
		if (session.data?.user && projectId) {
			const { user } = session.data;
			const { idToken } = user;
			addExtraChiefEditor(+projectId, extraChiefEditor.id, idToken)
				.then((data) => window.location.replace(`/?projectId=${data.id}`))
				.catch(() => setIsError(true))
				.finally(() => setIsDisabled(false));
		}
	};

	const extraChiefEditorsListView = extraChiefEditorsList.map(({ id, firstName, lastName }) => ({
		label: `${firstName} ${lastName}`,
		value: id,
	}));

	const extraChiefEditorView = extraChiefEditor
		? {
				label: `${extraChiefEditor.firstName} ${extraChiefEditor.lastName}`,
				value: extraChiefEditor.id,
		  }
		: { label: "", value: "" };

	const loading = isLoading && <Typography>Loading...</Typography>;
	const error = isError && <p className="mb-2 text-red-500 text-base">Something wrong</p>;
	const content = !(isLoading || isError) && (
		<Autocomplete
			defaultValue={extraChiefEditorView}
			renderInput={(params) => <TextField {...params} variant="standard" label="Add Extra Chief Editor" />}
			options={extraChiefEditorsListView}
			onChange={(_, newValue) => {
				if (newValue?.value) {
					setExtraChiefEditor((prevState) => ({
						...prevState,
						id: newValue.value,
					}));
				}
			}}
		/>
	);
	return (
		<Dialog fullWidth open={isOpen} onClose={handleClose}>
			<DialogTitle>Add Extra Chief Editor</DialogTitle>
			<DialogContent>
				{loading}
				{content}
				{error}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" disabled={isDisabled} onClick={handleAddExtraChiefEditor}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};
