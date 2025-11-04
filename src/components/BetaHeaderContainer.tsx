import React, { FC, ReactNode } from "react";

type BetaHeaderContainerProps = {
	children: ReactNode;
};

export const BetaHeaderContainer: FC<BetaHeaderContainerProps> = ({
	children,
}) => {
	return <div className="bg-yellow-100 p-8">{children}</div>;
};
