'use client'

import React, { useEffect, useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { ArrowRight, FileSliders, Github, Home, Map, Search, ShoppingCart } from 'lucide-react'
import { Kbd, KbdGroup } from '../ui/kbd'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function SearchInputCmdk() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [])

    return (
        <>
            <InputGroup >
                <InputGroupInput
                    placeholder='Tìm kiếm...'
                    onClick={() => setOpen(true)}
                    autoComplete='off'
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align='inline-end'>
                    <KbdGroup>
                        <Kbd>⌘ + K</Kbd>
                        <Kbd>Ctrl + K</Kbd>
                    </KbdGroup>
                </InputGroupAddon>
            </InputGroup>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder='Nhập lệnh hoặc tìm kiếm...' />
                <CommandList className='scrollbar-hidden'>
                    <CommandEmpty>
                        Không tìm thấy kết quả.
                    </CommandEmpty>
                    <CommandGroup heading="Trang">
                        <CommandItem>
                            <ArrowRight />
                            <span>Sản phẩm</span>
                        </CommandItem>
                        <CommandItem>
                            <ArrowRight />
                            <span>Mã khuyến mãi</span>
                        </CommandItem>
                        <CommandItem>
                            <ArrowRight />
                            <span>Danh mục sản phẩm</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Tiện ích">
                        <CommandItem>
                            <Home />
                            <span>Về trang chủ</span>
                        </CommandItem>
                        <CommandItem>
                            <Map />
                            <span>Bản tin du lịch</span>
                        </CommandItem>
                        <CommandItem>
                            <FileSliders />
                            <span>Bản tin hệ thống</span>
                        </CommandItem>
                    </CommandGroup>
                    <div className='sticky bottom-0 bg-background p-2 border-t mt-2 flex items-center justify-between'>
                        <p className='text-sm text-muted-foreground'>Nhấn <KbdGroup><Kbd>Esc</Kbd></KbdGroup> để đóng</p>
                        <Button variant={'link'} asChild size={'icon-sm'}>
                            <Link href={'https://github.com/giabao12-hali'} target='_blank'>
                                <Github size={16} />
                            </Link>
                        </Button>
                    </div>
                </CommandList>
            </CommandDialog>
        </>
    )
}
