import {Link} from "react-router-dom";

const BreadCrumb = (props) => {
	const {title} = props;
	return (
		<div className="w-full py-4">
			<p className="text-center mb-0">
				<Link to="/" className="text-dark">
					Home &nbsp;
				</Link>
				/ {title}
			</p>
		</div>
	);
};

export default BreadCrumb;
