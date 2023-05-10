import {social, social2, social3} from "../../assets";

const Social = () => {
	return (
		<div className="wrapper">
			<h2 className="pb-10">Truyền thông nói về BookingCare</h2>
			<div className="flex gap-10">
				<div>
					{/* <iframe
						width="560"
						height="315"
						title="BookingCare trên VTV1"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						// @ts-ignore
						allowFullScreen=""
						src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"
					></iframe> */}
				</div>
				<div>
					<ul className="flex flex-wrap gap-5">
						<li className="h-[50px] max-w-[138px] w-full">
							<img
								src={social}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
						<li className="h-[50px] max-w-[138px] w-full">
							<img
								src={social2}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
						<li className="h-[50px] max-w-[114px] w-full">
							<img
								src={social3}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
						<li className="h-[50px] max-w-[138px] w-full">
							<img
								src={social}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
						<li className="h-[50px] max-w-[138px] w-full">
							<img
								src={social2}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
						<li className="h-[50px] max-w-[114px] w-full">
							<img
								src={social3}
								className="w-full h-full object-contain"
								alt=""
							/>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Social;
