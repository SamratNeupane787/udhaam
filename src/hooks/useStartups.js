export default function useStartups(){

  let dataLoading = false
  const getStartups = async()=>{
    try {
      dataLoading = true;
      const response = await fetch("http://127.0.0.1:8000/api/v1/startups");
      const data = await response.json()
      if (data) {
        console.log(data);
        return data;
      }
    } catch (error) {
      dataLoading = true;
      alert("Error fetching the startups")
    }finally{
      dataLoading = false;
    }
   
  }

  const getStartup = async(id)=>{
    try {
      dataLoading = true;
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${id}`
      );
      const data = await response.json();
      if (data) {
        console.log(data);
        return data;
      }
    } catch (error) {
      dataLoading = true;
      alert("Error fetching the startups");
    } finally {
      dataLoading = false;
    }
   
  }

  const trendingStartups = async()=>{
    try {
      dataLoading= true;
      const response = await fetch("http://127.0.0.1:8000/trendingstartups");
      const data = await response.json()
      if(data){
        console.log(data);
        return data
      }
    } catch (error) {
      dataLoading = true;
      alert("Error fetching the startups");
    }
    finally{
      dataLoading= false
    }
  }
  return{
    getStartups,
    getStartup,
    trendingStartups
  }
}