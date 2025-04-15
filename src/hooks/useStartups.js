export default function useStartups(){

  const token = localStorage.getItem("token")
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


  const submitStartups = async (data) => {
 
    console.log(data)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/startups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,s
        },
        body: JSON.stringify(data),
      });

     
      if (response.ok) {
        const responseData = await response.json();
        alert("Startup submitted Successfully");
        return responseData; 
      } else {
        alert("Failed to submit startup. Please try again.");
      }
    } catch (error) {
      alert("Error Submitting startups: " + error.message);
    } finally {
      dataLoading = false;
    }
  };
  return {
    getStartups,
    getStartup,
    trendingStartups,
    submitStartups,
  };
}