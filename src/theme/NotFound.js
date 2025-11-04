/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import Image from "@theme/IdealImage";
import freddy404Image from "../assets/404-yeti@2x.png";

function NotFound() {
	return (
		<Layout
			title={translate({
				id: "theme.NotFound.title",
				message: "Page Not Found",
			})}
		>
			<main className="container margin-vert--xl">
				<div className="row">
					<div className="col col--6 col--offset-3">
						<div className="row--nowrap sm-device-col-wrap">
							<div className="w-[250px] h-[250px]">
								<Image img={freddy404Image} />
							</div>
							<div className="hero__text__404">
								<h1>
									<Translate
										id="theme.NotFound.title"
										description="The title of the 404 page"
									>
										404 Page Not Found
									</Translate>
								</h1>

								<p>
									<Translate
										id="theme.NotFound.p1"
										description="The first paragraph of the 404 page"
									>
										Sorry about that.
									</Translate>
								</p>
								<p>
									<Translate
										id="theme.NotFound.p2"
										description="The 2nd paragraph of the 404 page"
									>
										While Freddy tries to uncover this mystery, please navigate
										back to our home page.
									</Translate>
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
}

export default NotFound;
