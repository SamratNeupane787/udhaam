export default function useStartups(){
  const APIURL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token")
  console.log(APIURL)
  let dataLoading = false
  const getStartups = async()=>{
    try {
      dataLoading = true;
      const response = await fetch(`${APIURL}/api/v1/startups`);
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
      const response = await fetch(`${APIURL}/api/v1/startups/${id}`);
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
      const response = await fetch(`${APIURL}/trendingstartups`);
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
      const response = await fetch(`${APIURL}/api/v1/startupS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      console.log(error)
    } finally {
      dataLoading = false;
    }
  };

  const myStartups = async(id)=>{
    try {
      dataLoading = true
      const response = await fetch(`${APIURL}/mystartups/${id}`);
      const data = await response.json()
      return data
    
    } catch (error) {
      dataLoading = false
      alert("Error fetching the startups")
    }
    finally{
      dataLoading = false
    }
  }

  const oneStartup = async(id)=>{
    try {
      dataLoading = true
      const response = await fetch(`${APIURL}/api/v1/startups/${id}`);
      const data = await response.json()
      return data
    } catch (error) {
      dataLoading = false
      alert('Error fetching startup details')
    }finally{
      dataLoading= false
    }
  }
  return {
    getStartups,
    getStartup,
    trendingStartups,
    submitStartups,
    myStartups,
    oneStartup
  };
}