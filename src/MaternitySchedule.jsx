import React, { useState } from "react";
import { Card, CardContent } from './components/ui/card';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const computeDates = (birthDate, maternityStart) => {
  if (!birthDate || !maternityStart) return [];
  const bd = new Date(birthDate);

  return [
    { name: "Vizita medic de familie", suggested: "Prima saptamana", intervalStart: new Date(bd.setDate(bd.getDate() + 1)).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 6)).toLocaleDateString(), duration: 1, description: "sanatate" },
    { name: "Protectis Baby (daily)", suggested: "", intervalStart: new Date(bd.setDate(bd.getDate() + 1)).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 29)).toLocaleDateString(), duration: 30, description: "sanatate - indicat la cezariana" },
    { name: "Vitamina D", suggested: "", intervalStart: new Date(bd).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 30)).toLocaleDateString(), duration: 30, description: "" },
    { name: "Vaccin BCG", suggested: "", intervalStart: new Date(bd).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 7)).toLocaleDateString(), duration: 7, description: "" },
    { name: "Rezultate screening metabolic", suggested: "", intervalStart: new Date(bd).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 7)).toLocaleDateString(), duration: 7, description: "" },
    { name: "Consult medic de familie la o luna", suggested: "", intervalStart: new Date(bd.setDate(bd.getDate() + 30)).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 1)).toLocaleDateString(), duration: 1, description: "" },
    { name: "Vaccin Hexavalent/Rotarix/Pneumococic", suggested: "", intervalStart: new Date(bd.setDate(bd.getDate() + 60)).toLocaleDateString(), intervalEnd: new Date(bd.setDate(bd.getDate() + 1)).toLocaleDateString(), duration: 1, description: "" },
  ];
};

export default function MaternitySchedule() {
  const [birthDate, setBirthDate] = useState("");
  const [maternityStart, setMaternityStart] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [schedule, setSchedule] = useState([]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Maternity Schedule Planner</h1>
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <label className="w-48 text-right font-medium">Ziua de nastere copil:</label>
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-48 text-right font-medium">Data inceput concediu maternitate:</label>
          <Input type="date" value={maternityStart} onChange={(e) => setMaternityStart(e.target.value)} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-48 text-right font-medium">Greutate copil la nastere (grame):</label>
          <Input type="number" value={babyWeight} onChange={(e) => setBabyWeight(e.target.value)} />
        </div>
      </div>
      <Button onClick={() => setSchedule(computeDates(birthDate, maternityStart))}>Generate Schedule</Button>
      <div className="space-y-2">
        {schedule.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">Suggested: {item.suggested || "N/A"}</p>
              <p className="text-gray-500">Interval: {item.intervalStart} - {item.intervalEnd}</p>
              <p className="text-gray-500">Duration: {item.duration} day(s)</p>
              {item.description && <p className="text-gray-500">Description: {item.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
