import React, { useRef, useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobal from "../../hooks/useGlobal";
import Wave1 from "../../../static/img/Wave1.svg";
import Wave2 from "../../../static/img/Wave2.svg";

const SandboxButton = ({ newValue }) => {
	const { siteConfig } = useDocusaurusContext();
	const buttonRef = useRef();
	const [shouldRender, setShouldRender] = useState(false);
	const [bool, setBool] = useState(true);
	const [visible, setVisible] = useState(false);
	const [buttonHover, setButtonHover] = useState(false);
	const [codeHover, setCodeHover] = useState(false);
	const [animation, setAnimation] = useState("fadeIn 0.2s linear");
	const { dispatch } = useGlobal();
	const setValue = (val) => dispatch({ type: "input", value: val });

	const updateValue = () => {
		let val = getClosest();
		setValue(JSON.parse(val));
	};

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		// event listeners for sibling code block
	// 		let sibling = buttonRef.current.nextElementSibling;
	// 		sibling.addEventListener("mouseenter", () => {
	// 			setCodeHover(true);
	// 		});
	// 		sibling.addEventListener("mouseleave", () => {
	// 			setCodeHover(false);
	// 		});
	// 		// test to see if valid JSON
	// 		let sr = getClosest();
	// 		if (!sr) {
	// 			setShouldRender(false);
	// 		}
	// 	}, 1000);
	// }, []);

	// useEffect(() => {
	// 	if (buttonHover) {
	// 		setAnimation("");
	// 	}
	// 	if (!buttonHover && !codeHover) {
	// 		setVisible(false);
	// 		setTimeout(() => {
	// 			setAnimation("fadeIn 0.2s linear");
	// 		}, 100);
	// 	} else {
	// 		setVisible(true);
	// 	}
	// }, [buttonHover, codeHover]);

	const toggleBool = () => {
		setBool(!bool);
	};

	const getClosest = () => {
		const buttn = buttonRef.current;
		const block = buttn.nextElementSibling.cloneNode(true);

		// remove any commented values
		let spans = block.querySelectorAll("span");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].innerHTML.startsWith("//")) {
				spans[i].innerHTML = "";
			}
		}

		const outer = block.outerHTML;
		var strippedHtml = outer.replace(/<[^>]+>/g, "");
		if (strippedHtml.endsWith("Copy")) {
			strippedHtml = strippedHtml.substring(0, strippedHtml.length - 4);
		}

		let parsedVal;

		try {
			parsedVal = JSON.parse(strippedHtml);
		} catch (e) {
			console.warn(strippedHtml, e);
			return false;
		} finally {
			let jsonValue = JSON.stringify(parsedVal, null, 2);
			return jsonValue;
		}
	};

	if (!shouldRender) {
		return null;
	}

	return (
		<div
			className="sandbox-button-outer"
			ref={buttonRef}
			onMouseEnter={() => setButtonHover(true)}
			onMouseLeave={() => {
				setTimeout(() => {
					setButtonHover(false);
				}, 50);
			}}
		>
			{visible && (
				<div
					className="sandbox-button"
					onClick={updateValue}
					style={{
						opacity: visible ? 1 : 0,
						animation: animation,
					}}
				>
					{bool && (
						<span title="Open in Sandbox" onMouseEnter={toggleBool}>
							<Wave1 />
						</span>
					)}

					{!bool && (
						<span title="Open in Sandbox" onMouseLeave={toggleBool}>
							<Wave2 />
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default SandboxButton;
