import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss';
import { useState } from "react";
import { useEffect } from "react";


export function RepositoryList() {

  const [ repositories, setRepositories ] = useState([]);


  useEffect(() => {

    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => {
        setRepositories(data)
      })
  }, [])


  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}
        {/* {repositories.map(repository => (<RepositoryItem repository={repository} />)} */}
        {/* {repositories.map(repository => <RepositoryItem repository={repository}/>)} */}


        
      </ul>
    </section>
  );
}
