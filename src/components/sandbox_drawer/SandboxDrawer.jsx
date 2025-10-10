import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import MDXContent from "@theme/MDXContent";

const SandboxDrawer = ({ defaultValue, defaultContext, seedTransactions }) => (
	<MDXContent>
		<BrowserOnly>
			{() => {
				const PG = require("./SandboxDrawerComponent").SandboxDrawerComponent;
				return (
					<PG
						defaultValue={defaultValue}
						defaultContext={defaultContext}
						seedTransactions={seedTransactions}
					/>
				);
			}}
		</BrowserOnly>
	</MDXContent>
);

export default SandboxDrawer;
