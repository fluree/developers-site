import React from "react";
import { GlobalProvider } from "@site/src/hooks/useGlobal.jsx";

export default function Root({ children }) {
	return (
		<>
			<GlobalProvider>{children}</GlobalProvider>
		</>
	);
}
