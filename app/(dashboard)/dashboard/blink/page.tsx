'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Plus, ExternalLink, Trash2 } from 'lucide-react';

// Mock data for Blinks
const mockBlinks = [
  { id: 1, name: 'Donation Link', type: 'Payment', url: 'https://barkblink.com/blink/123', createdAt: '2023-06-01' },
  { id: 2, name: 'NFT Minting', type: 'NFT', url: 'https://barkblink.com/blink/456', createdAt: '2023-06-05' },
  { id: 3, name: 'Crowdfunding', type: 'Payment', url: 'https://barkblink.com/blink/789', createdAt: '2023-06-10' },
];

export default function BlinkDashboardPage() {
  const [blinks, setBlinks] = useState(mockBlinks);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  const handleCreateBlink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBlink = {
      id: blinks.length + 1,
      name: formData.get('blinkName') as string,
      type: formData.get('blinkType') as string,
      url: `https://barkblink.com/blink/${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBlinks([...blinks, newBlink]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteBlink = (id: number) => {
    setBlinks(blinks.filter(blink => blink.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-syne">Your Blinks</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
              <Plus className="mr-2 h-4 w-4" /> Create Blink
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-syne">Create New Blink</DialogTitle>
              <DialogDescription className="font-syne">
                Set up a new Blink for your blockchain interactions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateBlink}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="blinkName" className="text-right font-syne">
                    Name
                  </Label>
                  <Input
                    id="blinkName"
                    name="blinkName"
                    placeholder="Enter Blink name"
                    className="col-span-3 font-syne"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="blinkType" className="text-right font-syne">
                    Type
                  </Label>
                  <Select name="blinkType" required>
                    <SelectTrigger className="col-span-3 font-syne">
                      <SelectValue placeholder="Select Blink type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payment" className="font-syne">Payment</SelectItem>
                      <SelectItem value="NFT" className="font-syne">NFT</SelectItem>
                      <SelectItem value="Token" className="font-syne">Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
                  Create Blink
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-syne">Blink Overview</CardTitle>
          <CardDescription className="font-syne">Manage and monitor your Blinks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-syne">Name</TableHead>
                <TableHead className="font-syne">Type</TableHead>
                <TableHead className="font-syne">Created</TableHead>
                <TableHead className="font-syne">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blinks.map((blink) => (
                <TableRow key={blink.id}>
                  <TableCell className="font-medium font-syne">{blink.name}</TableCell>
                  <TableCell className="font-syne">{blink.type}</TableCell>
                  <TableCell className="font-syne">{blink.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-syne"
                        onClick={() => window.open(blink.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-syne text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteBlink(blink.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="font-syne" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne" onClick={() => setIsCreateDialogOpen(true)}>
            <Zap className="mr-2 h-4 w-4" /> Quick Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}