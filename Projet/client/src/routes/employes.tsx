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


function addEmploye() {
  // Ajouter une fonction qui va faire appel à la fonction de création d'un chantier
  console.log("Ajouter un chantier");
  return null;
}

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
    </>
  );
}
