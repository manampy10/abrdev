import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

export default function Lists() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "/opportunity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };
    fetchData().then((r) => console.log(r));
  }, []);

  const row = data.map((d) => {
    return {
      numeroOpportunite: d.numeroOpportunite,
      referenceDossier: d.referenceDossier,
      numeroSiretSiren: d.numeroSiretSiren,
      affaire: d.affaire,
      nomClient: d.nomClient,
      intermediaire: d.intermediaire,
      description: d.description,
    };
  });

  const columns = [
    { key: "numeroOpportunite", name: "Numero Opportunité" },
    {
      key: "referenceDossier",
      name: "Reference Dossier",
    },
    { key: "numeroSiretSiren", name: "Numero Siret Siren" },
    { key: "affaire", name: "Affaire" },
    {
      key: "nomClient",
      name: "Nom Client",
    },
    { key: "intermediaire", name: "Intermediaire" },
    { key: "description", name: "Description" },
  ];

  const filteredRow = row.filter((r) => {
    return (
      r.numeroOpportunite.includes(filter) ||
      r.referenceDossier.includes(filter) ||
      r.numeroSiretSiren.includes(filter) ||
      r.affaire.includes(filter) ||
      r.nomClient.includes(filter) ||
      r.intermediaire.includes(filter) ||
      r.description.includes(filter)
    );
  });

  // const exportExcel = (filteredRow) => {
  //     const ws = XLSX.utils.json_to_sheet(filteredRow);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //     XLSX.writeFile(wb, 'opportunite.xlsx');
  // };

  /*const exportWord = (filteredRow) => {
        const doc = new docx.Document(undefined);
        doc.addSection({
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun('Numero Opportunité'),
                        new docx.TextRun('Reference Dossier'),
                        new docx.TextRun('Numero Siret Siren'),
                        new docx.TextRun('Affaire'),
                        new docx.TextRun('Nom Client'),
                        new docx.TextRun('Intermediaire'),
                        new docx.TextRun('Description'),
                    ],
                }),
                ...filteredRow.map((r) => {
                    return new docx.Paragraph({
                        children: [
                            new docx.TextRun(r.numeroOpportunite),
                            new docx.TextRun(r.referenceDossier),
                            new docx.TextRun(r.numeroSiretSiren),
                            new docx.TextRun(r.affaire),
                            new docx.TextRun(r.nomClient),
                            new docx.TextRun(r.intermediaire),
                            new docx.TextRun(r.description),
                        ],
                    });
                }),
            ],
        });
        docx.Packer.toBlob(doc).then((blob) => {
            saveAs(blob, 'opportunite.docx');
        });
    };*/

  return (
    <div>
      <h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            className={"typo-title typo-color--axablue"}
            style={{
              textAlign: "center",
              margin: "20px 0",
              fontSize: "3rem",
            }}
          >
            Liste des opportunité
          </h1>

          <input
            type="text"
            placeholder="Rechercher une opportunité"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            onChange={(e) => setFilter(e.target.value)}
          />

          <button
            type="submit"
            className={"button-next cta-button__btn--action"}
          >
            <Link
              to="/create"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.7rem",
              }}
            >
              Nouveau devis
            </Link>
          </button>
        </div>
        <div>
          <DataGrid
            columns={columns}
            rows={filteredRow}
            className={"typo-title typo-color--axablue"}
            style={{
              color: "inherit",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          ></div>
        </div>
      </h1>
    </div>
  );
}
