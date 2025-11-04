import React from "react";

type IFigureWithCaptionProps = {
	children: React.ReactNode;
	caption: string;
};
export const FigureWithCaption = ({
	children,
	caption,
}: IFigureWithCaptionProps) => (
	<figure>
		{children}
		<figcaption className="text-sm text-center mt-4 text-gray-600">
			{caption}
		</figcaption>
	</figure>
);
