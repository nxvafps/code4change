import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function AddProject() {
  return (
    <div>
      <NavBar />

      <form>
        <br></br>
        <input type="text" name="name" placeholder="Project name" />
        <br></br>
        <input type="text" name="name" placeholder="GitHub Url" />
        <br></br>
        <input type="text" name="name" placeholder="Project description" />
        <br></br>
        <input type="text" name="name" placeholder="Category" />
        <br></br>
        <input type="text" name="name" placeholder="Project_img url" />
        <br></br>
        <input type="text" name="name" placeholder="Skills" />
        <br></br>
        <button type="submit">Submit</button>
      </form>

      <Footer />
    </div>
  );
}
