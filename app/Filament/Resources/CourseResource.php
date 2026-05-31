<?php

namespace App\Filament\Resources;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Enums\NavigationGroup;
use App\Enums\UserRole;
use App\Filament\Resources\CourseResource\Pages;
use App\Filament\Resources\CourseResource\RelationManagers\SectionsRelationManager;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Actions;
use Illuminate\Support\Str;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-academic-cap';
    protected static \UnitEnum|string|null $navigationGroup = NavigationGroup::Content;
    protected static ?string $modelLabel = 'Curso';
    protected static ?string $pluralModelLabel = 'Cursos';
    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')
                ->label('Título')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
            TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true),
            Select::make('instructor_id')
                ->label('Instructor')
                ->options(User::where('role', UserRole::Teacher)->pluck('name', 'id'))
                ->searchable()
                ->required(),
            Select::make('category_id')
                ->label('Categoría')
                ->options(Category::pluck('name', 'id'))
                ->searchable()
                ->nullable(),
            Select::make('level')->label('Nivel')->options(CourseLevel::class)->required(),
            Select::make('status')->label('Estado')->options(CourseStatus::class)->required()->default(CourseStatus::Draft),
            TextInput::make('price')->label('Precio referencial')->numeric()->prefix('$')->nullable(),
            FileUpload::make('thumbnail')->label('Portada')->image()->nullable()->columnSpanFull(),
            RichEditor::make('description')->label('Descripción')->required()->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->label('Título')->searchable()->sortable()->limit(40),
                TextColumn::make('instructor.name')->label('Instructor')->searchable()->sortable(),
                TextColumn::make('category.name')->label('Categoría')->badge(),
                TextColumn::make('level')->label('Nivel')->badge()->sortable(),
                TextColumn::make('status')->label('Estado')->badge()->sortable(),
                TextColumn::make('price')->label('Precio')->money('USD')->sortable(),
                TextColumn::make('created_at')->label('Creado')->dateTime('d/m/Y')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->label('Estado')->options(CourseStatus::class),
                SelectFilter::make('level')->label('Nivel')->options(CourseLevel::class),
                SelectFilter::make('category_id')->label('Categoría')
                    ->options(Category::pluck('name', 'id')),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            SectionsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
