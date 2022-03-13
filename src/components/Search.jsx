import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const [query,setQuery] = useSearchParams();
  const search = query.get("search");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          value={search ? search : ""}
          placeholder="Title"
          aria-label="Search Movies"
          onChange={(e) => {
            const value = e.target.value;
            setQuery({search: value})
          }}
        />
        <FaSearch size={20} color="black" className={styles.searchButton} />
      </div>
    </form>
  );
}
