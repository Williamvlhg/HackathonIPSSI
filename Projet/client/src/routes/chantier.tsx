import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table";
import { FolderSync } from 'lucide-react';
import { FolderClosed } from "lucide-react";
import { PersonStanding } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { Site } from '@/types/site';


export const Route = createFileRoute("/chantier")({
  component: RouteComponent,
});



const data: Site[] = [
  {
    id: 1,
    name: "Chantier 1",
    skills: [
      {
        id: 1,
        label: "Electricien",
      },
      {
        id: 2,
        label: "Menuisier",
      },
      {
        id: 3,
        label: "Plombier",
      },
      {
        id: 4,
        label: "Peintre",
      },
    ],
    address: "12 rue les marchands",
    startDate: "2021-10-10",
    endDate: "2021-10-20",
  },
  {
    id: 2,
    name: "Chantier 2",
    skills: [
      {
        id: 1,
        label: "Electricien",
      },
      {
        id: 3,
        label: "Plombier",
      },
      {
        id: 4,
        label: "Peintre",
      },
    ],
    address: "12 rue les marchands",
    startDate: "2025-2-15",
    endDate: "2025-3-25",
  },
  {
    id: 3,
    name: "Chantier 3",
    skills: [
      {
        id: 1,
        label: "Electricien",
      },
      {
        id: 5,
        label: "Maçon",
      },
      {
        id: 3,
        label: "Plombier",
      },
      {
        id: 4,
        label: "Peintre",
      },
    ],
    address: "12 rue les marchands",
    startDate: "2025-10-20",
    endDate: "2025-10-30",
  }

];

const columns: ColumnDef<Site, string>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    
    accessorKey: "address",
    header: "Adresse",
  },
  {
    accessorKey: "skills",
    header: "Compétences",
    cell: ({ row }) => {
      const skills = row.original.skills.map(skill => skill.label).join(", ");
      return <span>{skills}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Date de début",
  },
  {
    accessorKey: "endDate",
    header: "Date de fin",
  },
]

function RouteComponent() {
  return (
    <>
      <div className="flex justify-evenly mt-10">
        <Card className="w-60 ">
          <CardHeader>
            <CardTitle>
              <FolderSync size={30}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">5</CardContent>
          <CardDescription>Nombre de chantier (en cours)</CardDescription>
        </Card>
        <Card className="w-60">
          <CardHeader>
            <CardTitle>
              <PersonStanding size={30} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">37</CardContent>
          <CardDescription>Nombre d'employés affectés</CardDescription>
        </Card>
        <Card className="w-60">
          <CardHeader>
            <CardTitle>
              <FolderClosed size={30}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">67</CardContent>
          <CardDescription>Nombre totale de chantier</CardDescription>
        </Card>
      </div>
      <div className="flex gap-2 mt-20 align-middle" >
        <span> Ajouter un chantier </span>
        <CirclePlus onClick={() => console.log("test")}/> 
      </div>

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>


    </>
  );
}
