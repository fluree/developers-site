import React, { FC } from "react";

type DocsBannerProps = {
	link: string;
};

export const DocsBanner: FC<DocsBannerProps> = ({ link }) => {
	return (
		<h3
			style={{
				padding: "20px",
				textAlign: "center",
				backgroundColor: "var(--ifm-color-primary)",
				color: "white",
			}}
		>
			For documentation of Fluree versions before 1.0.0 please refer to{" "}
			<a href="https://docsarchive.flur.ee" style={{ color: "black" }}>
				{link}
			</a>
		</h3>
	);
};
