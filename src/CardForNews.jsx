import "./CardForNews.css";

function CardForNews({ title, imageUrl, summary }) {
  return (
    <>
      <div className="card-page">
        <img className="card-image" src={imageUrl} alt={title} />
        <h1 className="card-title">{title}</h1>
      </div>
      <div className="card-page">
        <p className="card-summary">{summary}</p>
      </div>
    </>
  );
}
export default CardForNews;
