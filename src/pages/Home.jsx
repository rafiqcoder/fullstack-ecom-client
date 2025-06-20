import { useGetProductsQuery } from "../redux/api/productsApi/productsApi";


const Home = () => {
  const { data, loading, error } = useGetProductsQuery()

if(loading){

  return(

    <div>

      loading ..
    </div>
  )
}

  if (error) {
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }

  console.log(data);

  return (<div>This is the home page</div>)
};

export default Home;
