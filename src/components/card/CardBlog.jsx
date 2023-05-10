import React from "react";
import {AiOutlineRight} from "react-icons/ai";
import {blog} from "../../assets";

const CardBlog = () => {
	return (
		<div>
			<div>
				<img src={blog} alt="" className="rounded" />
			</div>
			<div>
				<h4 className="pt-2">
					Gói Chăm sóc Sức khỏe Tại nhà dành cho người Rối loạn chuyển hóa
				</h4>
				<p className="line-clamp-3 pt-2 text-sm font-light">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
					officia vero veniam corporis consequuntur commodi ab, minima possimus
					aliquid consequatur alias! Adipisci, sequi? Fugiat tenetur obcaecati
					dolores laudantium modi explicabo!
				</p>
				<button className="text-primary pt-2 flex items-center gap-5">
					xem chi tiết{" "}
					<span>
						<AiOutlineRight />
					</span>
				</button>
			</div>
		</div>
	);
};

export default CardBlog;
