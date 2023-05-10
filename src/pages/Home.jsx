import Banner from "../components/banner/Banner";
import BlogList from "../components/blog/BlogList";
import SlickList from "../components/slick-list/SlickList";
import Social from "../components/social/Social";
import DoctorList from "../components/doctor-list/DoctorList";
import {useGetAllSpecialtyQuery} from "../redux/api/specialtyApi";
import {useGetClinicQuery} from "../redux/api/clinicApi";
import HandBook from "../system/admin/HandBook";

const Home = () => {
	const {data: specialties} = useGetAllSpecialtyQuery(10);
	const {data: clinics} = useGetClinicQuery();

	return (
		<>
			<Banner />
			<BlogList />
			<SlickList
				isTopDoctor={false}
				data={[]}
				title="Bác sĩ từ xa qua Video"
				bg="bgPrimary"
			/>
			<SlickList
				isTopDoctor={false}
				data={specialties}
				title="Chuyên khoa phổ biến"
				bg=""
			/>
			<SlickList
				data={clinics}
				title="Cơ sở y tế nổi bật"
				bg="bgPrimary"
				isTopDoctor={true}
			/>
			<DoctorList />
			<HandBook />

			<Social />
		</>
	);
};

export default Home;
