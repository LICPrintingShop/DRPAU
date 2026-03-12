import Link from "next/link";

export default function Home() {

  const branches = [83, 93, 97, 115, 117, 118, 120];

  return (
    <div className="container">

      <h1 className="title">LIC PRINTING SHOP</h1>
      <p className="subtitle">DR PAU Branch Selection</p>

      <div className="branchGrid">
        {branches.map((branch) => (
          <Link key={branch} href={`/client?branch=${branch}`} className="branchBtn">
            {branch}
          </Link>
        ))}
      </div>

    </div>
  );
}
