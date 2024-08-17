import { ChevronDown, Menu, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const handleLogout = async () => {
  await signOut({ redirect: false });
};

const UserCard = () => {
  const { data: session, status } = useSession();
  const { user } = session ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center rounded-full p-1 hover:bg-subtle"
          disabled={status === 'loading'}
        >
          {status === 'loading' && (
            <span className="size-8 animate-pulse rounded-full bg-subtle-hover/80 sm:size-10" />
          )}

          {user ? (
            <Avatar className="size-8 sm:size-10">
              <AvatarImage src={user?.image ?? user?.name?.charAt(0)} />
              <AvatarFallback className="bg-primary/30 uppercase">
                <User className="size-6 text-primary" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Menu className="size-6 text-primary" />
          )}

          {status === 'authenticated' && (
            <ChevronDown
              className={cn('size-4 text-neutral-dark-2 sm:size-5')}
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-1 w-56" align="end">
        {status === 'authenticated' ? (
          <>
            <DropdownMenuLabel className="pb-0 pt-3">
              {user?.name}
            </DropdownMenuLabel>
            <span className="block px-2 pb-1 text-xs text-neutral-dark-1">
              {user?.email}
            </span>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/events/applied" passHref legacyBehavior>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="font-medium">Applied Events</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/events/created" passHref legacyBehavior>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="font-medium">My Created Events</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" passHref legacyBehavior>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="font-medium">Settings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <Link href="/signup" passHref legacyBehavior>
              <DropdownMenuItem className="cursor-pointer">
                <span className="font-medium">Create an account</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/login" passHref legacyBehavior>
              <DropdownMenuItem className="cursor-pointer">
                <span className="font-medium">Login</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/events" passHref legacyBehavior>
              <DropdownMenuItem className="cursor-pointer">
                <span className="font-medium">Find events</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCard;
