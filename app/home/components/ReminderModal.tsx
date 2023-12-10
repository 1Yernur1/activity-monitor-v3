"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

export const ReminderModal = () => {
	const [showReminder, setShowReminder] = useState(false);

	useEffect(() => {
		const checkTime = () => {
			const currentTime = new Date();
			const targetTime = new Date();
			targetTime.setHours(17, 30, 30);
			if (
				currentTime.getHours() === targetTime.getHours() &&
				currentTime.getMinutes() === targetTime.getMinutes() &&
				currentTime.getSeconds() === targetTime.getSeconds()
			) {
				setShowReminder(true);
			}
		};
		const interval = setInterval(checkTime, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Dialog open={showReminder} fullWidth onClose={() => setShowReminder(false)}>
			<DialogTitle>Reminder</DialogTitle>
			<DialogContent>Don't forget to record own working hours and improve data accuracy.</DialogContent>
			<DialogActions>
				<Button variant="contained" className="bg-black" onClick={() => setShowReminder(false)}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};
