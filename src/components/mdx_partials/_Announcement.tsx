import React, { FC } from "react";

type AnnouncementProps = {
	text: string;
};

export const Announcement: FC<AnnouncementProps> = ({ text }) => {
	return (
		<h3
			style={{
				padding: "20px",
				textAlign: "center",
				backgroundColor: "var(--ifm-color-primary)",
				color: "white",
			}}
		>
			{text}
		</h3>
	);
};
