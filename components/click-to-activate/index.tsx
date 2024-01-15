import { useState } from 'react'

export function ClickToActivate({ children }: React.PropsWithChildren<any>)
{
	const [active, setActive] = useState(false);
	const [buttonHover, setButtonHover] = useState(false);
	const [buttonActive, setButtonActive] = useState(false);

	let html;
	if(!active)
	{
		const divStyle =
		{
			background: "#f2f7fc",
			border: "1px solid transparent",
			borderRadius: "10px",
			height: "500px",
			marginTop: "20px",
			width: "100%",
		};
		const buttonStyle = 
		{
			background: "white",
			border: "2px solid black",
			borderRadius: "10px",
			cursor: "pointer",
			display: "block",
			fontSize: "30px",
			margin: "225px auto 0 auto",
			padding: "10px",
		};
		const buttonStyleHover =
		{
			...buttonStyle,
			border: "2px solid #006be6",
			color: "#006be6",
		}
		const buttonStyleActive =
		{
			...buttonStyle,
			background: "#006be6",
			color: "white",
		}
		let currentButtonStyle = buttonStyle;
		if(buttonHover) currentButtonStyle = buttonStyleHover;
		if(buttonActive) currentButtonStyle = buttonStyleActive;

		html =
		(
			<div className="click-to-activate" style={divStyle}>
				<button
					className="click-to-activate-button"
					onClick={()=>setActive(true)}
					onMouseOver={()=>setButtonHover(true)}
					onMouseOut={()=>{setButtonHover(false);setButtonActive(false);}}
					onMouseDown={()=>setButtonActive(true)}
					onMouseUp={()=>setButtonActive(false)}
					style={currentButtonStyle}>
						Click to Activate Demo
					</button>
			</div>
		);
	}
	else
	{
		html = children;
	}
	return html;
}
