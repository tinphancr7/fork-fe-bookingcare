import {useGetHandBookByIdQuery} from "../redux/api/handbookApi";
import {Link, useParams} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {BsFillLightbulbFill} from "react-icons/bs";
import {handleParseBufferImage} from "../utils/helpers";
import ScheduleDoctor from "../system/doctor/ScheduleDoctor";
import DoctorExtraInfo from "../system/doctor/DoctorExtraInfo";
import ProfileDoctor from "../system/doctor/ProfileDoctor";
import {ImLocation2} from "react-icons/im";
const DetailHandBook = () => {
	const {id} = useParams();
	const {data} = useGetHandBookByIdQuery(id, {skip: !id});

	return (
		<div className="">
			<div className="bg-[#f6f6f6] flex gap-2 items-center py-2 px-10 text-primary">
				<span>
					<AiFillHome />
				</span>
				{"/"}
				<span>Cẩm nang</span>
				{"/"}
				<span>Bệnh Da liễu</span>
			</div>
			<div className="wrapper detail-handbook">
				<h1>{data?.title}</h1>
				<div
					className="max-w-[1170px] w-full mx-auto p2-4 detail-doctor"
					dangerouslySetInnerHTML={{
						__html: data?.intro,
					}}
				></div>
				<div className="flex gap-5 p-5 rounded-md bg-[#dff0d8] items-center mb-10">
					<span>
						<BsFillLightbulbFill className="text-orange-500" />
					</span>
					<p>
						BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
						Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy
						tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản
						phẩm y tế chất lượng cao.
					</p>
				</div>
				<div>
					<img
						src={data?.image ? handleParseBufferImage(data?.image) : ""}
						className="w-full h-[400px]"
						alt=""
					/>
				</div>
				<div className="bg-[#fcfaf6] py-10">
					<div
						className=" w-[700px] mx-auto p2-4 detail-doctor"
						dangerouslySetInnerHTML={{
							__html: data?.description,
						}}
					></div>
				</div>

				<div className="bg-[#fff04b] px-2 py-5 mb-10">
					<h3>ĐẶT KHÁM DỄ DÀNG CÙNG BOOKINGCARE</h3>
					<p>
						Sau đây là một số bác sĩ giỏi (hoặc đơn vị uy tín) chuyên Trị nấm da
						chân với Bác sĩ Da liễu Hà Nội - TPHCM. Bệnh nhân có thể đặt lịch
						trước tại đây để đi khám và điều trị hiệu quả.
					</p>
					<div>
						{data?.doctorSpecialty?.map((item, index) => (
							<div
								key={index}
								className="grid grid-cols-2 gap-10 rounded-md p-4 mt-5  bg-white shadow"
							>
								<div className="border-r border-slate-200 pr-5">
									<ProfileDoctor doctorId={item?.doctorId} isShow={true} />
									<div className="flex gap-5">
										<Link
											className="text-sm text-primary"
											to={`/admin/doctors/${item?.doctorId}`}
										>
											Xem thêm
										</Link>
										<div className="flex gap-2 text-sm ">
											<span>
												<ImLocation2 size={15} />
											</span>

											<span>{item?.provinceData?.valueVi}</span>
										</div>
									</div>
								</div>
								<div>
									<ScheduleDoctor doctorId={item?.doctorId} />
									<DoctorExtraInfo doctorId={item?.doctorId} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailHandBook;
