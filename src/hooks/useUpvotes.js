export default function useUpvotes (){


  const getUpvotes = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${id}/upvotes`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch upvotes");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching upvotes:", error);
      return null;
    }
  };

  const doUpvote = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${id}/upvotes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to upvote");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error upvoting:", error);
      return null;
    }
  };

  const removeUpvote = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${id}/upvotes`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to remove upvote");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error removing upvote:", error);
      return null;
    }
  };



  return {
    getUpvotes,
    doUpvote,
    removeUpvote,
  };
}