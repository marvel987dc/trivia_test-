import Categories from "../components/Categories"

export const fetchData = async(category) => {
    const url = `https://opentdb.com/api.php?amount=5&category=${category}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.log("Fetch error:", error.message);
    }
}