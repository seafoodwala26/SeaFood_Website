'use client';

import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/admin/theme-toggle';
import { authApi } from '@/lib/api';

export function AdminHeader() {
  const router = useRouter();
  const handleLogout = async () => {
    await authApi.logout();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Admin" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight md:block">
                <p className="text-sm font-medium text-foreground">Manish</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
