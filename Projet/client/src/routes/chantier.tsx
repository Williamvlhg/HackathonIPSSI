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
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createFileRoute("/chantier")({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteComponent />
    </QueryClientProvider>
  ),
});

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
      const skills = row.original.skills.length > 0
        ? row.original.skills.map(skill => skill.label).join(", ")
        : "Aucune";
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
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const today = new Date();
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
      let status = "A démarrer";

      if (today >= startDate && today <= endDate) {
        status = "En cours";
      } else if (today > endDate) {
        status = "Terminée";
      }

      return <span>{status}</span>;
    },
  },
]

function RouteComponent() {
  const { data, error, isLoading } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/site/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result.data;
    },
  });
  console.log(data);
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
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <DataTable
              data={data || []}
              columns={columns}
            />
          )}
        </div>


    </>
  );
}
