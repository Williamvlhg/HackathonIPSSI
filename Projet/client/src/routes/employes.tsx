import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FolderSync } from 'lucide-react';
import { FolderClosed } from "lucide-react";
import { PersonStanding } from 'lucide-react';
import { CirclePlus } from 'lucide-react';


export const Route = createFileRoute("/employes")({
  component: RouteComponent,
});


const data = [
  {
    id: 1,
    name: "Chantier 1",
    status: "En cours",
    employees: 25,
    totalTasks: 50
  },
  {
    id: 2,
    name: "Chantier 2",
    status: "En attente",
    employees: 15,
    totalTasks: 30
  },
  {
    id: 3,
    name: "Chantier 3",
    status: "Terminé",
    employees: 30,
    totalTasks: 45
  }
];

function RouteComponent() {
  return (
    <>
      <div className="flex space-x-5 mt-5 w-full">
        <Card className="p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100">
          <CardHeader>
            <CardTitle>
              <FolderSync size={50}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">5</CardContent>
          <CardDescription className="px-6">Nombres total d'employés</CardDescription>
        </Card>
        <Card className="p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100">
          <CardHeader>
            <CardTitle>
              <PersonStanding size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">37</CardContent>
          <CardDescription className="px-6">Nombre d'employés affectés</CardDescription>
        </Card>
        <Card className="p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100">
          <CardHeader>
            <CardTitle>
              <FolderClosed size={50}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">67</CardContent>
          <CardDescription className="px-6">Nombre d'employés disponibles</CardDescription>
        </Card>
      </div>
      <div className="flex gap-2 mt-20 align-middle" >
        <span> Ajouter un employé </span>
        <CirclePlus onClick={() => console.log("test")}/> 
      </div>

    </>
  );
}
