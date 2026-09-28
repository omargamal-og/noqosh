import { Component, HostListener, OnInit, computed, signal } from '@angular/core';

type Category = 'الكل' | 'خط عربي' | 'زخارف' | 'روحانيات' | 'نباتي';

interface Artwork {
  id: number;
  image: string;
  category: Exclude<Category, 'الكل'>;
  caption: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly introVisible = signal(true);
  protected readonly menuOpen = signal(false);
  protected readonly activeCategory = signal<Category>('الكل');
  protected readonly selectedArtwork = signal<Artwork | null>(null);
  protected readonly currentYear = new Date().getFullYear();

  protected readonly categories: Category[] = ['الكل', 'خط عربي', 'زخارف', 'روحانيات', 'نباتي'];

  protected readonly artworks: Artwork[] = [
    { id: 1, image: 'art/art-01.webp', category: 'روحانيات', caption: 'خط وزخرفة معمارية' },
    { id: 2, image: 'art/art-02.webp', category: 'زخارف', caption: 'تناغم دائري وخطي' },
    { id: 3, image: 'art/art-03.webp', category: 'خط عربي', caption: 'تكوين خطي دائري' },
    { id: 4, image: 'art/art-04.webp', category: 'نباتي', caption: 'زخرفة نباتية هادئة' },
    { id: 5, image: 'art/art-05.webp', category: 'روحانيات', caption: 'معمار وخط عربي' },
    { id: 6, image: 'art/art-06.webp', category: 'خط عربي', caption: 'حرف داخل هندسة دائرية' },
    { id: 7, image: 'art/art-07.webp', category: 'زخارف', caption: 'هندسة دائرية دقيقة' },
    { id: 8, image: 'art/art-08.webp', category: 'زخارف', caption: 'قوس هندسي مزخرف' },
    { id: 9, image: 'art/art-09.webp', category: 'خط عربي', caption: 'خط تحيطه زخرفة هندسية' },
    { id: 10, image: 'art/art-10.webp', category: 'زخارف', caption: 'تكوين زخرفي مركزي' },
    { id: 11, image: 'art/art-11.webp', category: 'زخارف', caption: 'هندسة متعددة الطبقات' },
    { id: 12, image: 'art/art-12.webp', category: 'زخارف', caption: 'ثنائية هندسية متناسقة' },
    { id: 13, image: 'art/art-13.webp', category: 'نباتي', caption: 'زخرفة مركزية ونباتات' },
    { id: 14, image: 'art/art-14.webp', category: 'نباتي', caption: 'تفاصيل نباتية رقيقة' },
    { id: 15, image: 'art/art-15.webp', category: 'نباتي', caption: 'زهرة مركزية دقيقة' },
    { id: 16, image: 'art/art-16.webp', category: 'نباتي', caption: 'تكوين نباتي دائري' },
    { id: 17, image: 'art/art-17.webp', category: 'زخارف', caption: 'هندسة متعددة الطبقات' },
    { id: 18, image: 'art/art-18.webp', category: 'زخارف', caption: 'دائرة هندسية بطابع ترابي' },
    { id: 19, image: 'art/art-19.webp', category: 'زخارف', caption: 'تفاصيل هندسية محايدة' },
    { id: 20, image: 'art/art-20.webp', category: 'زخارف', caption: 'دوائر بدرجات باردة' },
    { id: 21, image: 'art/art-21.webp', category: 'زخارف', caption: 'تكوين دائري متوازن' },
    { id: 22, image: 'art/art-22.webp', category: 'نباتي', caption: 'زخرفة نباتية كلاسيكية' },
    { id: 23, image: 'art/art-23.webp', category: 'نباتي', caption: 'تفاصيل نباتية دافئة' },
    { id: 24, image: 'art/art-24.webp', category: 'نباتي', caption: 'نباتات داخل إطار هندسي' }
  ];

  protected readonly featured = [this.artworks[2], this.artworks[21], this.artworks[4], this.artworks[6], this.artworks[17], this.artworks[14]];

  protected readonly filteredArtworks = computed(() => {
    const category = this.activeCategory();
    return category === 'الكل'
      ? this.artworks
      : this.artworks.filter((item) => item.category === category);
  });

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.introVisible.set(false);
      return;
    }
    window.setTimeout(() => this.introVisible.set(false), 1900);
  }

  protected setCategory(category: Category): void {
    this.activeCategory.set(category);
  }

  protected openArtwork(artwork: Artwork): void {
    this.selectedArtwork.set(artwork);
    document.body.style.overflow = 'hidden';
  }

  protected closeArtwork(): void {
    this.selectedArtwork.set(null);
    document.body.style.overflow = '';
  }

  protected toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected skipIntro(): void {
    this.introVisible.set(false);
  }

  @HostListener('window:keydown.escape')
  protected onEscape(): void {
    if (this.selectedArtwork()) this.closeArtwork();
  }
}
